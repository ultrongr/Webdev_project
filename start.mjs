import { recordCompany } from "./app.mjs";

const PORT = 3000;
const server = recordCompany.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server.');
    server.close(() => {
        console.log('Http server closed.');
    });
});