import connectDB from './src/infrastructure/database';
import { Comment } from './src/domain/models/Comment';

const postId = "65f2ea97c8ee468b850b53fd";

async function diagnose() {
  try {
    await connectDB();

    const comments = await Comment.find({ postId: postId });
    console.log("Comentarios encontrados:", comments);
  } catch (error) {
    console.error("Error al buscar comentarios:", error);
  } 
}

diagnose();
