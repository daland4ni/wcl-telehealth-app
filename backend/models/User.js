const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ['patient', 'doctor'],
      default: 'patient',
    },

    specialization: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    licenseNumber: {
      type: String,
    },

    // PATIENT FIELDS
    height: {
      type: Number,
    },

    weight: {
      type: Number,
    },

    birthday: {
      type: Date,
    },

    contactNumber: {
      type: String,
    },

    medicalHistory: {
      type: String,
    },

    certifyInformation: {
      type: Boolean,
      default: false,
    },

    consentToDataSharing: {
      type: Boolean,
      default: false,
    },

    profilePicture: {
      type: String,
      default: '',
    },

    bio: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'User',
  userSchema
);