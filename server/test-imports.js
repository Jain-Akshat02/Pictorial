// Test imports for all dependencies
import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import multer from 'multer';

// Log the type of each import
console.log('express:', typeof express);
console.log('bcrypt:', typeof bcrypt);
console.log('bodyParser:', typeof bodyParser);
console.log('cloudinary:', typeof cloudinary);
console.log('cookieParser:', typeof cookieParser);
console.log('cors:', typeof cors);
console.log('dotenv:', typeof dotenv);
console.log('Joi:', typeof Joi);
console.log('jwt:', typeof jwt);
console.log('mongoose:', typeof mongoose);
console.log('multer:', typeof multer); 