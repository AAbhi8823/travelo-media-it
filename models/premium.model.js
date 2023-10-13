//book premium service price for IT services model

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const premiumSchema = new Schema(
  {
    service_name: [
      {
        type: String,
        enum: [
          "Website Development",
          "Website Designing",
          "Website Maintenance",
          "Website Hosting",
          "Mobile App Development",
          "Digital Marketing",
          "Graphic Designing",
          "Content Writing",
          "Website Speed Optimization",
          "Website Maintenance",
          "Website Management",
        ],
        required: false,
      },
    ],
    service_description: {
      type: String,
      required: false,
    },
    service_image: {
      type: String,
      required: false,
    },
    plan: [
      {
        plan_type: {
          type: String,
          enum: ["Basic", "Standard", "Enterprise"],
          required: true,
          default: "Basic",
        },
        plan_price: {
          type: String,
          required: true,
        },
        plan_duration: {
          type: String,
          enum: ["3 Months", "6 Months", "1 Year"],
          required: true,
          default: "3 Months",
        },
        plan_features: [
          {
            feature: {
              type: String,
              required: true,
            },
            
          },
        ],
      },
    ],
    
    isLive: {
      type: Boolean,
      required: true,
    },
    service_createdAt: {
      type: Date,
      default: Date.now,
    },
    service_updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Premium", premiumSchema, "premium");
