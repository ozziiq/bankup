# Sleep
sleep 15

# Migrate
echo "Memulai proses migrasi..."
npm run db:migrate

# Mulaiu
echo "Memulai aplikasi..."
npm run start 
# node server.js # for multistage
