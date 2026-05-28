import {
    useEffect,
    useState,
} from 'react';

import { getAllDoctors } from '../../services/doctorService';
import {
    createAvailability,
} from '../../services/availabilityService';

const DoctorDirectory = () => {
    const [doctors, setDoctors] =
        useState([]);

    const [date, setDate] =
        useState('');

    const [startTime, setStartTime] =
        useState('');

    const [endTime, setEndTime] =
        useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data =
                await getAllDoctors();

            setDoctors(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateSlot =
        async () => {
            try {
                await createAvailability({
                    doctor: user._id,
                    date,
                    startTime,
                    endTime,
                });

                alert(
                    'Availability slot created!'
                );

                setDate('');
                setStartTime('');
                setEndTime('');
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <div className="min-h-screen bg-[#FCF7F8] p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#A31621]">
                        Doctor Directory
                    </h1>

                    <p className="text-[#4E8098] mt-2">
                        Browse all registered
                        healthcare professionals.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="bg-white rounded-3xl border border-[#BEBFC5] shadow-md p-6"
                        >
                            <h2 className="text-xl font-bold text-[#A31621]">
                                {doctor.name}
                            </h2>

                            <p className="text-[#4E8098] mt-1">
                                {
                                    doctor.specialization
                                }
                            </p>

                            <div className="mt-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${doctor.isAvailable
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {doctor.isAvailable
                                        ? 'Available'
                                        : 'Unavailable'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorDirectory;