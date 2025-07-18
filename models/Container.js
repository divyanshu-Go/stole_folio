// models/Container.js
import mongoose from 'mongoose';

const stylesSchema = new mongoose.Schema({
  height: String,
  width: String,
  borderWidth: String,
  borderStyle: String,
  borderColor: String,
  padding: String,
  margin: String,
  backgroundColor: String,
  color: String,
  display: String,
  flexDirection: String,
  justifyContent: String,
  alignItems: String,
  fontSize: String,
  fontWeight: String,
  flexWrap: String,
  borderRadius: String,
  boxShadow: String,
  opacity: String,
  zIndex: String,
  position: String,
  transform: String,
  transition: String
}, { _id: false });

const hoverStylesSchema = new mongoose.Schema({
  backgroundColor: String,
  color: String,
  borderColor: String,
  opacity: String,
  scale: String,
  boxShadow: String
}, { _id: false });

// Recursive Container schema using a function to handle circular reference
const ContainerSchema = new mongoose.Schema({
  name: {
    type:String,
    default: 'Container'
  },
  container_Id: {
    type: String,
    default: () => Math.random().toString(36).substr(2, 9)
  },
  type: {
    type: String,
    default: 'div'
  },
  text: {
    type: String,
    default: ''
  },
  projectName: { type: String },
  styles: {
    type: stylesSchema,
    default: () => ({})
  },
  hoverStyles: {
    type: hoverStylesSchema,
    default: () => ({})
  },
  locked: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

// Workaround to make recursive reference work
ContainerSchema.add({
  children: {
    type: [ContainerSchema],
    default: [],
    validate: {
      validator: val => val.length <= 4,
      message: 'Container can have at most 4 children'
    },
    default: () => [null, null, null, null]
  }
});



const Container = mongoose.models.Container || mongoose.model('Container', ContainerSchema);
export default Container;
