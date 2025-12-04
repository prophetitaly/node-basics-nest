import { parentPort, workerData } from "worker_threads";

// Function to check if a number is prime
function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Heavy computation: find and sum all prime numbers up to iterations
function computeHeavyTask(iterations: number): number {
  let sum = 0;
  for (let i = 2; i <= iterations; i++) {
    if (isPrime(i)) {
      sum += i;
    }
  }
  return sum;
}

const { iterations } = workerData;
const result = computeHeavyTask(iterations);

if (parentPort) {
  parentPort.postMessage(result);
}
