import { parentPort, workerData } from "worker_threads";

// TODO: Implement heavy computation worker
// This worker should:
// 1. Receive iterations from workerData
// 2. Perform a CPU-intensive task (e.g., find prime numbers, calculate fibonacci, etc.)
// 3. Send the result back to the main thread via parentPort.postMessage()
//
// Example: Find and sum all prime numbers up to iterations
// Tips:
// - Implement a function to check if a number is prime
// - Loop through numbers and accumulate the result
// - Use parentPort.postMessage(result) to send the result back

const { iterations } = workerData;

// Your implementation here

if (parentPort) {
  // parentPort.postMessage(result);
}
