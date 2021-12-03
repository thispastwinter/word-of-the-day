export default function useCheckEnvironment() {
  const env = process.env.NODE_ENV
  return { currentEnvironment: env }
}
