const mongoose =
  require('mongoose');

const medicalRecordSchema =
  new mongoose.Schema(
    {
      patient: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true,
      },

      doctor: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'User',

        required: true,
      },

      appointment: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: 'Appointment',

        required: true,
      },

      // PATIENT BASELINE INFO
      height: String,

      weight: String,

      birthday: Date,

      allergies: String,

      chronicIllnesses:
        String,

      operations: String,

      // CONSULTATION INFO
      diagnosis: {
        type: String,

        required: true,
      },

      consultationNotes:
        {
          type: String,

          required: true,
        },

      prescription: {
        type: String,

        required: true,
      },

      createdAt: {
        type: Date,

        default: Date.now,
      },
    }
  );

module.exports =
  mongoose.model(
    'MedicalRecord',
    medicalRecordSchema
  );