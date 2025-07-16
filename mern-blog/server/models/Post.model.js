const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: String,
  content: {
    type: String,
    required: [true, 'A post must have content'],
    trim: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  featuredImage: String,
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  publishedAt: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate comments
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id'
});

// Create slug from title
postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Set publishedAt when status changes to published
postSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);