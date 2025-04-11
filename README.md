# 🎧 Real-Time Noise Level Gauge

This project visualizes real-time ambient noise levels using a gauge meter and color indicators, powered by the Web Audio API.

## 🚀 Features

- Live microphone audio input
- Real-time noise level detection and analysis
- Analog-style gauge that reflects current noise intensity
- Color-coded segments: green (quiet), yellow (moderate), red (loud)
- Simple and responsive user interface

## 🖼️ Preview

![Noise Gauge Preview](Photo/Project%20view.jpeg)

## 📦 How It Works

- Uses the `getUserMedia()` API to access the microphone.
- Analyzes audio frequency data using `AudioContext` and `AnalyserNode`.
- Calculates average volume and maps it to a gauge.
- Visual feedback is provided with a rotating needle and color-coded ticks.