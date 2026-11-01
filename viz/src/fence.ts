// A fenced code block is content a document is *showing*, not structure it
// *has*: a quoted PLAN.md task-line grammar example, a tasknote's example row,
// or a template body must not switch the current section, count as a
// criterion, or parse as a real task line. Every line-scanner across
// `parser.ts` and `tasknote.ts` consults this one mask so they agree on which
// lines are real structure. CommonMark fence rules: up to 3 spaces of indent,
// the closing run is the same character and at least as long as the opening
// one, and a backtick info string may not itself contain a backtick. An
// unclosed fence runs to end-of-input, also per CommonMark.
const FENCE_DELIMITER = /^ {0,3}(`{3,}|~{3,})(.*)$/;

export function fenceMask(lines: string[]): boolean[] {
  const mask: boolean[] = [];
  let open: string | null = null;
  for (const line of lines) {
    const m = FENCE_DELIMITER.exec(line);
    if (open === null) {
      // Both groups are mandatory and group 1 is 3+ chars, so the `!`s hold.
      if (m !== null && !(m[1]![0] === '`' && m[2]!.includes('`'))) {
        open = m[1]!;
        mask.push(true);
      } else {
        mask.push(false);
      }
      continue;
    }
    mask.push(true);
    const closes =
      m !== null && m[1]![0] === open[0] && m[1]!.length >= open.length && m[2]!.trim() === '';
    if (closes) open = null;
  }
  return mask;
}
