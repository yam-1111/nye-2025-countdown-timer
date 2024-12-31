import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import nye from '@/assets/nye.mp3';
import happy_pacquiao from '@/assets/pacquiao.mp4';
import sleep_pacquiao from '@/assets/sleep_pacquiao.png';

interface CountdownTimerProps {
  targetDate: Date; // Pass the target date as a Date object
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isTimeUp, setIsTimeUp] = useState(false); // Track when the time reaches zero
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const currentUnixTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp (seconds since epoch)
      const targetUnixTime = Math.floor(targetDate.getTime() / 1000); // Convert target date to Unix timestamp

      const difference = targetUnixTime - currentUnixTime;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsTimeUp(true); // Mark time as up

        // Stop the audio and play the video
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset audio
        }
        if (videoRef.current) {
          videoRef.current.volume = 1.0; // Set volume to 100%
          videoRef.current.play();
        }

        // Trigger fireworks
        launchFireworks();
        return;
      }

      const days = Math.floor(difference / (60 * 60 * 24));
      const hours = Math.floor((difference % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((difference % (60 * 60)) / 60);
      const seconds = difference % 60;

      setTimeLeft({ days, hours, minutes, seconds });

      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(calculateTimeLeft);
    };

    // Initial call to calculate time left
    requestAnimationFrame(calculateTimeLeft);

  }, [targetDate]);

  const launchFireworks = () => {
    const duration = 5 * 1000; // Fireworks duration (5 seconds)
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        startVelocity: 10,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-green-500 backdrop-blur-sm flex flex-col items-center justify-center">
      <h1 className="text-white text-5xl font-bold mb-6">Happy New Year! 🎉</h1>
      <div className="text-white text-9xl font-extrabold text-center">
        {timeLeft.days > 0 && <span>{timeLeft.days}d : </span>}
        <span>{String(timeLeft.hours).padStart(2, '0')} : </span>
        <span>{String(timeLeft.minutes).padStart(2, '0')} : </span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
        {isTimeUp && (
          <div className="mt-4 text-green-400 text-xl font-bold">Happy New Year!</div>
        )}
      </div>

      {/* Conditional rendering for image or video */}
      {!isTimeUp ? (
        <img
          src={sleep_pacquiao}
          alt="Pacquiao Sleeping"
          className="mt-8 w-full max-w-3xl h-auto rounded-lg shadow-lg"
        />
      ) : (
        <video
          ref={videoRef}
          src={happy_pacquiao}
          className="mt-8 w-full max-w-3xl h-auto rounded-lg shadow-lg"
          autoPlay
          loop
        />
      )}

      {/* Audio element for playing the sound */}
      <audio ref={audioRef} src={nye} autoPlay loop />
    </div>
  );
};

export default CountdownTimer;
