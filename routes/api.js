
const express = require('express');
const app=express();

const userRoutes=require('./user.routes')
const websiteRoutes=require('./website.routes')
const premiumRoutes=require('./premium.routes')
const serviceRoutes=require('./services.routes')
const contactusRoutes=require('./contactus.routes')
const faqsRoutes=require('./faqs.routes') 
const bpoRoutes=require('./bpo.solution.routes')  




app.use('/user',userRoutes);
app.use('/website',websiteRoutes);
app.use('/premium',premiumRoutes);
app.use('/service',serviceRoutes)
app.use('/contactus',contactusRoutes);
app.use('/faqs',faqsRoutes);
app.use('/bpo',bpoRoutes);



module.exports=app;