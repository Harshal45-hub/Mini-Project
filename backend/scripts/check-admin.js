const mongoose = require('mongoose');
require('dotenv').config();

async function checkAdmin() {
    try {
        // Connect to MongoDB Atlas
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB Atlas');
        
        // Get the database
        const db = mongoose.connection.db;
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('\n📚 Collections in database:');
        collections.forEach(col => console.log(`   - ${col.name}`));
        
        // Check if users collection exists
        if (collections.find(c => c.name === 'users')) {
            const users = await db.collection('users').find({}).toArray();
            
            console.log(`\n👥 Total users: ${users.length}`);
            
            // Find admin users
            const admins = users.filter(u => u.role === 'admin');
            
            if (admins.length > 0) {
                console.log('\n✅ Admin users found:');
                admins.forEach((admin, index) => {
                    console.log(`\n   Admin ${index + 1}:`);
                    console.log(`   📧 Email: ${admin.email}`);
                    console.log(`   👤 Name: ${admin.name}`);
                    console.log(`   🔑 Role: ${admin.role}`);
                    console.log(`   ✅ Active: ${admin.isActive}`);
                    console.log(`   🆔 ID: ${admin._id}`);
                });
            } else {
                console.log('\n❌ No admin users found!');
            }
            
            // Check for specific email
            const specificAdmin = users.find(u => u.email === 'admin345@gmail.com');
            if (specificAdmin) {
                console.log('\n✅ admin345@gmail.com exists in database');
            } else {
                console.log('\n❌ admin345@gmail.com NOT found in database');
            }
        } else {
            console.log('\n❌ Users collection does not exist yet!');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkAdmin();