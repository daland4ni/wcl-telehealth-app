const mongoose = require('mongoose');

const appointmentSchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'User',
        required: true,
      },

      doctor: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'User',
        required: true,
      },

      availabilitySlot: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'Availability',
        required: true,
      },

      appointmentDate: {
        type: String,
        required: true,
      },

      startTime: {
        type: String,
        required: true,
      },

      endTime: {
        type: String,
        required: true,
      },

      consentToShareRecords: {
        type: Boolean,
        required: true,
      },

      status: {
        type: String,
        enum: [
          'pending',
          'confirmed',
          'completed',
          'cancelled',
        ],
        default: 'confirmed',
      },
      consultationStarted: {
        type: Boolean,
        default: false,
      }
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    'Appointment',
    appointmentSchema
  );