//create website model for travel o media it solutions
const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema(
  {
    website_name: { type: String, required: true, trim: true },
    website_domain: { type: String, required: true, trim: true },
    website_description: { type: String, required: false, trim: true },
    website_logo: { type: String, required: false, trim: true },
    website_fevicon: { type: String, required: false, trim: true },
    isLive: { type: Boolean, default: false },

    about_us: [{ type: String, required: false, trim: true }],
    contact_us: [
      {
        name: { type: String, required: false, trim: true },
        email: { type: String, required: false, trim: true },
        subject: [
          {
            type: String,
            required: false,
            trim: true,
            enum: [
              "CMS Development",
              "Website Development",
              "Mobile App Development",
              "Digital Marketing",
              "Cloud Solutions",
              "Block Chain Services",
              "Others",
            ],
          },
        ],
        phone: { type: String, required: false, trim: true },
        message: { type: String, required: false, trim: true },
      },
    ],
    company_phone: { type: String, required: false, trim: true },
    company_email: { type: String, required: false, trim: true },

    services: [
      {
        name: { type: String, required: true, trim: true },
        sub_services: [
          {
            name: { type: String, required: true, trim: true },
            description: { type: String, required: false, trim: true },
            image: { type: String, required: false, trim: true },
          },
        ],
        image_icon: { type: String, required: false, trim: true },
      },
    ],

    portfolio: [
      {
        name: { type: String, required: false, trim: true },
        meta_data_description: { type: String, required: false, trim: true },
        sub_description: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true },

        image: { type: String, required: false, trim: true },
      },
    ],

    bpo_solutions: [
      {
        name: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true },
        image: { type: String, required: false, trim: true },
        bpo_sub_solutions: [
          {
            name: { type: String, required: false, trim: true },
            description: { type: String, required: false, trim: true },
            image: { type: String, required: false, trim: true },
          },
        ],
      },
    ],
    products: [
      {
        name: { type: String, required: false, trim: true },
        description: { type: String, required: false, trim: true },
        image: { type: String, required: false, trim: true },
      },
    ],

    faqs: [
      {
        category: { type: String, required: false, trim: true },
        query: [
          {
            question: { type: String, required: false, trim: true },
            answer: { type: String, required: false, trim: true },
          },
        ],
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Website", websiteSchema);
