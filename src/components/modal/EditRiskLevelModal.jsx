import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const EditRiskLevelModal = ({ open, onClose, level }) => {
  const [criteria, setCriteria] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiskLevel = async () => {
      try {
        const docRef = doc(db, "BreastCancerRiskLevels", level);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCriteria(data.criteria);
          setRecommendations(data.recommendations);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRiskLevel();
  }, [level]);

  const handleCriteriaChange = (index, value) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = value;
    setCriteria(updatedCriteria);
  };

  const handleRecommendationsChange = (field, value) => {
    setRecommendations((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      await updateDoc(doc(db, "BreastCancerRiskLevels", level), {
        criteria,
        recommendations,
      });
      toast.success("Risk level updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update risk level");
      console.error("Error updating risk level: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Risk Level: {level}</DialogTitle>
      <DialogContent>
        <h3>Criteria:</h3>
        {criteria.map((criterion, index) => (
          <TextField
            key={index}
            fullWidth
            margin="dense"
            label={`Criterion ${index + 1}`}
            value={criterion}
            onChange={(e) => handleCriteriaChange(index, e.target.value)}
          />
        ))}
        <h3>Recommendations:</h3>
        <TextField
          fullWidth
          margin="dense"
          label="Recommendation 1"
          value={recommendations.recommendation1 || ""}
          onChange={(e) =>
            handleRecommendationsChange("recommendation1", e.target.value)
          }
        />
        <TextField
          fullWidth
          margin="dense"
          label="Recommendation 2"
          value={recommendations.recommendation2 || ""}
          onChange={(e) =>
            handleRecommendationsChange("recommendation2", e.target.value)
          }
        />
        {/* Add more recommendation fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={saveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRiskLevelModal;
