import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createLecture } from '../../../Redux/Faculty/LectureSlice';

const lectureTypes = ['Class', 'Guest Lecture', 'Workshop', 'Seminar'];
const modes = ['Online', 'In-person', 'Hybrid'];
const levels = ['Undergraduate', 'Graduate', 'Postgraduate'];

const UploadLecture = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    lectureTitle: '',
    lectureDescription: '',
    lectureDate: '',
    lectureType: '',
    lectureLink: '',
    duration: '',
    institution: '',
    mode: '',
    participants : '',
    participantsCount: '',
    participantsFeedback: '',
    courseLevel: '',
  });

  const [errors, setErrors] = useState({});

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

    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('User ID not found in localStorage!');
      return;
    }

    const dataWithUser = { ...formData, userId };

    dispatch(createLecture(dataWithUser))
      .unwrap()
      .then(() => {
        toast.success('Lecture uploaded successfully!');
        setFormData({
          lectureTitle: '',
          lectureDescription: '',
          lectureDate: '',
          lectureType: '',
          lectureLink: '',
          duration: '',
          institution: '',
          mode: '',
          participantsCount: '',
          participantsFeedback: '',
          courseLevel: '',
        });
        setErrors({});
      })
      .catch((err) => {
        toast.error(err || 'Error uploading lecture');
      });
  };

  return (
    <Paper elevation={4} className="p-6 max-w-4xl mx-auto my-10">
      <Typography variant="h5" className="mb-6 font-semibold text-rose-600">
        Upload Lecture Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              label="Lecture Title"
              name="lectureTitle"
              fullWidth
              value={formData.lectureTitle}
              onChange={handleChange}
              error={!!errors.lectureTitle}
              helperText={errors.lectureTitle}
            />
            <TextField
              label="Lecture Date"
              name="lectureDate"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formData.lectureDate}
              onChange={handleChange}
              error={!!errors.lectureDate}
              helperText={errors.lectureDate}
            />
          </Box>

          <TextField
            label="Lecture Description"
            name="lectureDescription"
            fullWidth
            multiline
            rows={3}
            value={formData.lectureDescription}
            onChange={handleChange}
            error={!!errors.lectureDescription}
            helperText={errors.lectureDescription}
          />

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              label="Lecture Type"
              name="lectureType"
              select
              fullWidth
              value={formData.lectureType}
              onChange={handleChange}
              error={!!errors.lectureType}
              helperText={errors.lectureType}
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
              value={formData.lectureLink}
              onChange={handleChange}
              error={!!errors.lectureLink}
              helperText={errors.lectureLink}
            />
          </Box>

          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              label="Duration"
              name="duration"
              fullWidth
              value={formData.duration}
              onChange={handleChange}
              error={!!errors.duration}
              helperText={errors.duration}
            />
            <TextField
              label="Institution"
              name="institution"
              fullWidth
              value={formData.institution}
              onChange={handleChange}
              error={!!errors.institution}
              helperText={errors.institution}
            />
          </Box>

          <TextField
            label="Mode"
            name="mode"
            select
            fullWidth
            value={formData.mode}
            onChange={handleChange}
            error={!!errors.mode}
            helperText={errors.mode}
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
            value={formData.courseLevel}
            onChange={handleChange}
            error={!!errors.courseLevel}
            helperText={errors.courseLevel}
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" className="bg-rose-600 text-white">
              Submit Lecture
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default UploadLecture;
