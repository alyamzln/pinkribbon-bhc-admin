import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const EditRiskLevelModal = ({ open, onClose, level }) => {
  const [criteria, setCriteria] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!level) return; // Ensure level is defined before fetching data

    const fetchRiskLevel = async () => {
      try {
        const docRef = doc(db, "BreastCancerRiskLevels", level);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCriteria(data.criteria || []);
          setRecommendations(data.recommendations || {});
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

  const handleAddCriterion = () => {
    setCriteria([...criteria, ""]);
  };

  const handleRemoveCriterion = (index) => {
    const updatedCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(updatedCriteria);
  };

  const handleRecommendationsChange = (type, ageRange, field, value) => {
    setRecommendations((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [ageRange]: {
          ...prev[type][ageRange],
          [field]: value,
        },
      },
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
        <Typography variant="h6">Criteria:</Typography>
        {criteria.map((criterion, index) => (
          <Box key={index} display="flex" alignItems="center">
            <TextField
              fullWidth
              margin="dense"
              label={`Criterion ${index + 1}`}
              value={criterion}
              onChange={(e) => handleCriteriaChange(index, e.target.value)}
            />
            <IconButton onClick={() => handleRemoveCriterion(index)}>
              <RemoveCircleIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          startIcon={<AddCircleIcon />}
          onClick={handleAddCriterion}
          color="primary"
        >
          Add Criterion
        </Button>

        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Recommendations:
        </Typography>
        {Object.keys(recommendations).map((type) => (
          <Box key={type} mt={2}>
            <Typography variant="subtitle1">{type}</Typography>
            {Object.keys(recommendations[type]).map(
              (ageRange) =>
                ageRange !== "description" && (
                  <Box key={ageRange} mt={1}>
                    <Typography variant="body2">{`Age ${ageRange}`}</Typography>
                    <TextField
                      fullWidth
                      margin="dense"
                      label="Frequency"
                      value={recommendations[type][ageRange].frequency || ""}
                      onChange={(e) =>
                        handleRecommendationsChange(
                          type,
                          ageRange,
                          "frequency",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      margin="dense"
                      label="Source"
                      value={recommendations[type][ageRange].source || ""}
                      onChange={(e) =>
                        handleRecommendationsChange(
                          type,
                          ageRange,
                          "source",
                          e.target.value
                        )
                      }
                    />
                  </Box>
                )
            )}
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              value={recommendations[type].description || ""}
              onChange={(e) =>
                handleRecommendationsChange(
                  type,
                  "description",
                  "description",
                  e.target.value
                )
              }
            />
          </Box>
        ))}
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
