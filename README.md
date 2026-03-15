RakshaNetra is an AI-powered surveillance system designed to detect suspicious activities in shopping malls and trigger automated alarms to assist security personnel.

Problem Statement:
	Traditional CCTV systems rely on humans to watch multiple camera feeds, which is tiring and often leads to missed suspicious activities. Important events like unauthorized entry, violence, loitering, or abandoned objects may go unnoticed due to human limitations.

This project aims to develop an AI-powered smart surveillance system that automatically analyzes CCTV footage in real time and detects suspicious behavior, sending instant alerts to security personnel to improve safety and response time.

Objective:
To develop an AI-based smart surveillance system that automatically monitors CCTV footage.
To detect suspicious activities in real time using Computer Vision and Machine Learning.
To reduce human effort and monitoring errors in traditional CCTV monitoring.To send instant alerts when abnormal or dangerous behavior is detected.

To analyze customer movement and attention areas to understand where people are most attracted or spend more time.

To generate overall analytics reports such as crowd density, popular zones, and customer behavior patterns to help improve security and space management.

Technology Stack :
AI & Vision:
YOLOv8, OpenCV, PyTorch, CNN, DeepSORT

Backend:
Python, Flask, REST APIs

Frontend:
React, TypeScript, Vite, Tailwind CSS

Database:
MongoDB / PostgreSQL

Data Processing:
NumPy, Pandas

Visualization:
Matplotlib, Plotly

System Architecture Overview:

The system works in the following pipeline:

Camera Feed
↓
AI Detection (YOLOv8 + OpenCV)
↓
Object Tracking (DeepSORT)
↓
Activity Analysis (CNN Model)
↓
Alert Generation (Python Backend)
↓
Database Storage
↓
Dashboard Display (React + TypeScript)



Social Aspect:

Helps reduce theft and crime in public places like malls.

Improves safety and security for customers and shop owners.

Assists security guards with smart monitoring instead of only manual watching.

Promotes the use of modern AI technology for public safety.

Builds trust among people while shopping in crowded areas.


Conclusion

The  Theft Detection System provides a smart security solution for malls by using AI to detect suspicious activities in real time. The system automatically triggers an alarm when unusual behavior is identified, helping security respond quickly. This project demonstrates how technology can improve surveillance, reduce theft, and create a safer environment for shoppers and store owners.


