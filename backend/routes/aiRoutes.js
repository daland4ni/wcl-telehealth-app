const express = require('express');

const router = express.Router();

router.post(
  '/recommend-specialist',
  async (req, res) => {

    try {

      const { symptoms } =
        req.body;

      const text =
        symptoms.toLowerCase();

      let result = {
        specialization:
          'General Medicine',

        reason:
          'Your symptoms should first be evaluated by a general physician.',

        urgency: 'low',
      };

      // CARDIOLOGY
      if (
        text.includes('chest') ||
        text.includes('heart') ||
        text.includes('palpitations')
      ) {

        result = {
          specialization:
            'Cardiologist',

          reason:
            'Chest pain or heart-related symptoms may require cardiovascular evaluation.',

          urgency: 'high',
        };
      }

      // NEUROLOGY
      else if (
        text.includes('headache') ||
        text.includes('migraine') ||
        text.includes('dizziness')
      ) {

        result = {
          specialization:
            'Neurologist',

          reason:
            'Persistent headaches or dizziness may involve neurological conditions.',

          urgency: 'medium',
        };
      }

      // DERMATOLOGY
      else if (
        text.includes('rash') ||
        text.includes('skin') ||
        text.includes('itch')
      ) {

        result = {
          specialization:
            'Dermatologist',

          reason:
            'Skin irritation or rashes are best evaluated by a dermatologist.',

          urgency: 'low',
        };
      }

      // PULMONOLOGY
      else if (
        text.includes('cough') ||
        text.includes('breathing') ||
        text.includes('asthma')
      ) {

        result = {
          specialization:
            'Pulmonologist',

          reason:
            'Respiratory symptoms may require lung evaluation.',

          urgency: 'medium',
        };
      }

      // ORTHOPEDICS
      else if (
        text.includes('bone') ||
        text.includes('joint') ||
        text.includes('back pain')
      ) {

        result = {
          specialization:
            'Orthopedic',

          reason:
            'Bone, joint, or muscle pain may require orthopedic consultation.',

          urgency: 'medium',
        };
      }

      // PEDIATRICS
      else if (
        text.includes('child') ||
        text.includes('baby') ||
        text.includes('infant')
      ) {

        result = {
          specialization:
            'Pediatrician',

          reason:
            'Symptoms involving children should be assessed by a pediatrician.',

          urgency: 'medium',
        };
      }

      // DELAY FOR REALISM
      await new Promise(
        (resolve) =>
          setTimeout(resolve, 1500)
      );

      res.json(result);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          'AI recommendation failed',
      });
    }
  }
);

module.exports = router;