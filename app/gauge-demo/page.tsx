"use client";

import { useState } from "react";
import { Gauge } from "@/components/ui/gauge-1";

export default function GaugeDemoPage() {
  const [strengthValue, setStrengthValue] = useState(75);
  const [muscleValue, setMuscleValue] = useState(60);
  const [enduranceValue, setEnduranceValue] = useState(85);
  const [confidenceValue, setConfidenceValue] = useState(90);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        <h1 className="font-display text-6xl font-bold text-center mb-12 text-accent">
          Gauge Component Demo
        </h1>

        {/* Individual Gauges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Strength</h3>
            <Gauge
              value={strengthValue}
              size={200}
              primary="danger"
              label="Strength"
              showValue={true}
              showPercentage={true}
              gradient={true}
              glowEffect={true}
              tickMarks={true}
              transition={{ length: 1200, delay: 200 }}
            />
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={strengthValue}
                onChange={(e) => setStrengthValue(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Muscle Mass</h3>
            <Gauge
              value={muscleValue}
              size={200}
              primary="warning"
              label="Muscle"
              showValue={true}
              showPercentage={true}
              gradient={true}
              glowEffect={true}
              tickMarks={true}
              transition={{ length: 1200, delay: 400 }}
            />
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={muscleValue}
                onChange={(e) => setMuscleValue(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Endurance</h3>
            <Gauge
              value={enduranceValue}
              size={200}
              primary="info"
              label="Endurance"
              showValue={true}
              showPercentage={true}
              gradient={true}
              glowEffect={true}
              tickMarks={true}
              transition={{ length: 1200, delay: 600 }}
            />
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={enduranceValue}
                onChange={(e) => setEnduranceValue(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Confidence</h3>
            <Gauge
              value={confidenceValue}
              size={200}
              primary="success"
              label="Confidence"
              showValue={true}
              showPercentage={true}
              gradient={true}
              glowEffect={true}
              tickMarks={true}
              transition={{ length: 1200, delay: 800 }}
            />
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={confidenceValue}
                onChange={(e) => setConfidenceValue(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Different Gauge Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Full Circle</h3>
            <Gauge
              value={75}
              size={180}
              gaugeType="full"
              primary="success"
              gradient={true}
              showValue={true}
              showPercentage={true}
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Half Circle</h3>
            <Gauge
              value={75}
              size={180}
              gaugeType="half"
              primary="warning"
              gradient={true}
              showValue={true}
              showPercentage={true}
            />
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-white">Quarter Circle</h3>
            <Gauge
              value={75}
              size={180}
              gaugeType="quarter"
              primary="info"
              gradient={true}
              showValue={true}
              showPercentage={true}
            />
          </div>
        </div>

        {/* Multi-Ring Gauge */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-bold mb-4 text-white">Multi-Ring Progress</h3>
          <Gauge
            value={80}
            size={250}
            primary="success"
            gradient={true}
            showValue={true}
            showPercentage={true}
            multiRing={{
              enabled: true,
              rings: [
                { value: 90, color: "#dc2626", strokeWidth: 8, opacity: 0.8 },
                { value: 75, color: "#f59e0b", strokeWidth: 6, opacity: 0.7 },
                { value: 60, color: "#3b82f6", strokeWidth: 4, opacity: 0.6 }
              ]
            }}
          />
        </div>

        {/* Navigation Link */}
        <div className="text-center">
          <a
            href="/"
            className="bg-accent text-black px-8 py-4 text-lg font-semibold uppercase tracking-wide hover:bg-accent/90 transition-colors rounded-sm"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}