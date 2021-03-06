import cluster, { Worker } from 'cluster';
import os from 'os';
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Pid: ${pid}`);
    for (let i = 0; i < cpusCount-1; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker: Worker, code: number) => {
        console.log(`Worker died, Pid: ${worker.process.pid}. Code ${code}`);
        if (code === 1) {
            cluster.fork();
        }
    });
}

if (cluster.isWorker) {
    require ('./app.ts')
}