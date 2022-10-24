import { asGenre } from '../types/genre.type.js';
import crypto from 'crypto';

export const createMovie = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    publicationDate,
    genre,
    createdYear,
    rating,
    videoPreviewLink,
    videoLink,
    actors,
    director,
    movieDuration,
    commentAmount,
    username,
    email,
    profilePictureLink,
    password,
    posterLink,
    backgroundPictureLink,
    backgroundColor,
  ] = tokens;
  return {
    title,
    description,
    publicationDate,
    genre: asGenre(genre),
    createdYear: Number(createdYear),
    rating: Number(rating),
    videoPreviewLink,
    videoLink,
    actors: actors.split(';'),
    director,
    movieDuration: Number(movieDuration),
    commentAmount: Number(commentAmount),
    user: {
      name: username,
      email,
      profilePictureLink,
      password
    },
    posterLink,
    backgroundPictureLink,
    backgroundColor,
  };
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export function isPasswordValid(password: string): boolean {
  return password.length >= 6 && password.length <= 12;
}