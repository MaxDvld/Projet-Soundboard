import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// type de fichier autorisé
const typeAutorise = [
    'audio/mp3',
    'audio/mpeg',
    'audio/wav',
    'audio/ogg',
    'audio/mp4',
    'audio/flac'
];

// extension de fichier autorisé
const extensionAutorise = [
    '.mp3',
    '.wav',
    '.ogg',
    '.m4a',
    '.flac'
];

// configuration du stockage des fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, name + '-' + Date.now() + ext);
    }
});

// configuration du filtre de fichier
const fileFilter = (req, file, cb) => {
    if (typeAutorise.includes(file.mimetype) && extensionAutorise.includes(path.extname(file.originalname))) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé'), false);
    }
};

// configuration de multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // limite de taille de fichier à 10 Mo
});

export default upload;