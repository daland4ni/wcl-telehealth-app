const express = require('express');
const router = express.Router();

router.post('/recommend-specialist', async (req, res) => {
  try {
    const { symptoms } = req.body;

    const text = symptoms.toLowerCase();

    let result = {
      specialization: 'General Medicine',
      reason:
        'Your symptoms are general in nature. A General Medicine physician is recommended for initial assessment.',
      urgency: 'low',
    };

    // =========================
    // CARDIOLOGY
    // =========================
    if (
      text.includes('chest pain') ||
      text.includes('heart') ||
      text.includes('palpitations') ||
      text.includes('shortness of breath') ||
      text.includes('irregular heartbeat') ||
      text.includes('high blood pressure')
    ) {
      result = {
        specialization: 'Cardiology',
        reason:
          'Symptoms suggest a possible cardiovascular concern such as chest pain, palpitations, or blood pressure issues.',
        urgency: 'high',
      };
    }

    // =========================
    // DERMATOLOGY
    // =========================
    else if (
      text.includes('rash') ||
      text.includes('skin') ||
      text.includes('itch') ||
      text.includes('acne') ||
      text.includes('eczema') ||
      text.includes('allergy')
    ) {
      result = {
        specialization: 'Dermatology',
        reason:
          'Skin-related symptoms such as rashes, itching, or acne are best evaluated by a dermatologist.',
        urgency: 'low',
      };
    }

    // =========================
    // PEDIATRICS
    // =========================
    else if (
      text.includes('child') ||
      text.includes('baby') ||
      text.includes('infant') ||
      text.includes('fever in child') ||
      text.includes('pediatric') ||
      text.includes('newborn')
    ) {
      result = {
        specialization: 'Pediatrics',
        reason:
          'Symptoms involving infants or children should be handled by a pediatric specialist.',
        urgency: 'medium',
      };
    }

    // =========================
    // NEUROLOGY
    // =========================
    else if (
      text.includes('headache') ||
      text.includes('migraine') ||
      text.includes('dizziness') ||
      text.includes('dizzy') ||
      text.includes('seizure') ||
      text.includes('numbness') ||
      text.includes('memory loss')
    ) {
      result = {
        specialization: 'Neurology',
        reason:
          'Neurological symptoms such as headaches, dizziness, or numbness may require brain and nerve evaluation.',
        urgency: 'medium',
      };
    }

    // =========================
    // PSYCHIATRY
    // =========================
    else if (
      text.includes('anxiety') ||
      text.includes('depression') ||
      text.includes('panic') ||
      text.includes('stress') ||
      text.includes('insomnia') ||
      text.includes('suicidal')
    ) {
      result = {
        specialization: 'Psychiatry',
        reason:
          'Mental health symptoms such as anxiety, depression, or insomnia should be evaluated by a psychiatrist.',
        urgency: 'high',
      };
    }

    // =========================
    // ORTHOPEDICS
    // =========================
    else if (
      text.includes('bone') ||
      text.includes('fracture') ||
      text.includes('joint') ||
      text.includes('back') ||
      text.includes('sprain') ||
      text.includes('muscle pain')
    ) {
      result = {
        specialization: 'Orthopedics',
        reason:
          'Bone, joint, or muscle-related pain may require orthopedic evaluation.',
        urgency: 'medium',
      };
    }

    // =========================
    // OPHTHALMOLOGY
    // =========================
    else if (
      text.includes('eye') ||
      text.includes('vision') ||
      text.includes('vision loss') ||
      text.includes('red eye') ||
      text.includes('eye pain') ||
      text.includes('double vision')
    ) {
      result = {
        specialization: 'Ophthalmology',
        reason:
          'Eye-related symptoms such as blurred vision or pain should be checked by an ophthalmologist.',
        urgency: 'medium',
      };
    }

    // =========================
    // ENT (Ears, Nose, Throat)
    // =========================
    else if (
      text.includes('ear pain') ||
      text.includes('hearing') ||
      text.includes('sore throat') ||
      text.includes('sinus') ||
      text.includes('nose bleed') ||
      text.includes('congestion')
    ) {
      result = {
        specialization: 'ENT',
        reason:
          'Ear, nose, or throat symptoms such as sinus issues or sore throat are handled by an ENT specialist.',
        urgency: 'low',
      };
    }

    // =========================
    // OBSTETRICS & GYNECOLOGY
    // =========================
    else if (
      text.includes('pregnant') ||
      text.includes('pregnancy') ||
      text.includes('menstrual') ||
      text.includes('period pain') ||
      text.includes('vaginal') ||
      text.includes('pcos')
    ) {
      result = {
        specialization: 'Obstetrics & Gynecology',
        reason:
          'Reproductive health or pregnancy-related concerns should be evaluated by an OB-GYN specialist.',
        urgency: 'medium',
      };
    }

    // Simulated delay for realism
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'AI request failed',
    });
  }
});

module.exports = router;