export function useTransformer(code: string): string {
  // Ubah "export default { ... }" menjadi "({ ... })"
  return code.replace(/^\s*export\s+default\s+/, '(') + ')'
}
