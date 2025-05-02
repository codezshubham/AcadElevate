import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateLecture } from '../../../Redux/Faculty/LectureSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const lectureTypes = ['Class', 'Guest Lecture', 'Workshop', 'Seminar'];
const modes = ['Online', 'In-person', 'Hybrid'];
const levels = ['Undergraduate', 'Graduate', 'Postgraduate'];

const UpdateLecture = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const lecture = state?.lecture; // Extract the lecture object from the state
  const lectureId = lecture?.id;  // Extract the id from the lecture

  const [formData, setFormData] = useState({
    lectureTitle: '',
    lectureDescription: '',
    lectureDate: '',
    lectureType: '',
    lectureLink: '',
    duration: '',
    institution: '',
    mode: '',
    participants: '',
    participantsCount: '',
    participantsFeedback: '',
    courseLevel: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (lectureId) {
      // Initialize formData with lecture details if the id exists
      setFormData({
        lectureTitle: lecture?.lectureTitle || '',
        lectureDescription: lecture?.lectureDescription || '',
        lectureDate: lecture?.lectureDate || '',
        lectureType: lecture?.lectureType || '',
        lectureLink: lecture?.lectureLink || '',
        duration: lecture?.duration || '',
        institution: lecture?.institution || '',
        mode: lecture?.mode || '',
        participants: lecture?.participants || '',
        participantsCount: lecture?.participantsCount || '',
        participantsFeedback: lecture?.participantsFeedback || '',
        courseLevel: lecture?.courseLevel || '',
      });
    }
  }, [lectureId, lecture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const requiredFields = [
      'lectureTitle',
      'lectureDescription',
      'lectureDate',
      'lectureType',
      'lectureLink',
      'duration',
      'institution',
      'mode',
      'courseLevel',
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) newErrors[field] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const updatedLecture = { ...formData };
    console.log('Updated Lecture:', updatedLecture); // Debug log
  
    dispatch(updateLecture({ id: lectureId, updatedLecture }))
      .unwrap()
      .then(() => {
        toast.success('Lecture updated successfully!');
        navigate(-1);
      })
      .catch((err) => {
        console.error('Error updating lecture:', err); // Log error for debugging
        toast.error(err || 'Error updating lecture');
      });
  };
  

  return (
    <Paper
      elevation={10}
      className="p-8 max-w-5xl mx-auto my-12 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 rounded-3xl shadow-2xl"
    >
      <Typography variant="h4" className="text-white font-bold mb-6 text-center">
        Update Lecture Details
      </Typography>

      <Divider className="mb-6" />

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Lecture Title & Date */}
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
            <TextField
              label="Lecture Title"
              name="lectureTitle"
              fullWidth
              variant="outlined"
              value={formData.lectureTitle}
              onChange={handleChange}
              error={!!errors.lectureTitle}
              helperText={errors.lectureTitle}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            />
            <TextField
              label="Lecture Date"
              name="lectureDate"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData.lectureDate}
              onChange={handleChange}
              error={!!errors.lectureDate}
              helperText={errors.lectureDate}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            />
          </Box>

          {/* Lecture Description */}
          <TextField
            label="Lecture Description"
            name="lectureDescription"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.lectureDescription}
            onChange={handleChange}
            error={!!errors.lectureDescription}
            helperText={errors.lectureDescription}
            className="transition duration-300 ease-in-out transform hover:scale-105"
          />

          {/* Lecture Type & Link */}
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
            <TextField
              label="Lecture Type"
              name="lectureType"
              select
              fullWidth
              value={formData.lectureType}
              onChange={handleChange}
              error={!!errors.lectureType}
              helperText={errors.lectureType}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            >
              {lectureTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Lecture Link"
              name="lectureLink"
              fullWidth
              variant="outlined"
              value={formData.lectureLink}
              onChange={handleChange}
              error={!!errors.lectureLink}
              helperText={errors.lectureLink}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            />
          </Box>

          {/* Duration & Institution */}
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
            <TextField
              label="Duration (e.g., 1hr 30min)"
              name="duration"
              fullWidth
              variant="outlined"
              value={formData.duration}
              onChange={handleChange}
              error={!!errors.duration}
              helperText={errors.duration}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            />
            <TextField
              label="Institution"
              name="institution"
              fullWidth
              variant="outlined"
              value={formData.institution}
              onChange={handleChange}
              error={!!errors.institution}
              helperText={errors.institution}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            />
          </Box>

          {/* Mode & Course Level */}
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
            <TextField
              label="Mode"
              name="mode"
              select
              fullWidth
              variant="outlined"
              value={formData.mode}
              onChange={handleChange}
              error={!!errors.mode}
              helperText={errors.mode}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            >
              {modes.map((mode) => (
                <MenuItem key={mode} value={mode}>
                  {mode}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Course Level"
              name="courseLevel"
              select
              fullWidth
              variant="outlined"
              value={formData.courseLevel}
              onChange={handleChange}
              error={!!errors.courseLevel}
              helperText={errors.courseLevel}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Divider />

          {/* Submit Button */}
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold px-8 py-3 rounded-xl text-lg hover:scale-110 transition duration-300 ease-in-out"
            >
              Update Lecture
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default UpdateLecture;
