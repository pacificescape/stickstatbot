const mongoose = require('mongoose')


const stickerPackSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    contains_masks: Boolean,
    is_animated: Boolean,
    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    title: {
        type: String,
        index: true,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    current_stats: { // статистика для топа, к ней будет прибавляться статистика дней. или просить /packstats свежий
        installed: { type: Number, default: 0},
        removed: { type: Number, default: 0},
        Usage: { type: Number, default: 0}
    },
    all_stats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stats',
    }
    
}, {
    timestamps: true, // можно сделать 2 статистики. краткуюю тут и подробную в другой коллекции. эта нужна для топа
})

module.exports = mongoose.model('stickerPack', stickerPackSchema, 'StickerPacks')