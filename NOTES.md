# Interactive Design — Good vs Poor UX Comparison

Repo: `aakuaku90/interactive-design` on GitHub

## Good UX (`index.html`)
- **State machine** drives form through `idle → submitting → success/error → idle`
- **Loading indicator**: button text swaps to an animated spinner SVG
- **Disabled state**: button and form are disabled during submission, preventing double-submit
- **Inline validation**: per-field error messages with shake animation on invalid fields
- **Bottom sheet confirmation**: slides up with a personalized message ("Thanks {name}, your submission was saved!")
- **Success checkmark**: animated SVG checkmark draws into the button on success
- **Form reset**: fields clear automatically after successful submission
- **Short, honest delay**: ~800ms simulated delay feels natural

## Poor UX (`poor.html`)
- **No state machine**: raw event listener, no structured state transitions
- **No loading indicator**: button stays unchanged during the 4-second wait
- **No disabled state**: user can click submit multiple times, queuing duplicate submissions
- **No inline validation**: empty fields trigger a browser `alert('Please fill all fields')`
- **Vague confirmation**: after 4 seconds of silence, a plain "Done." text appears below the button
- **No visual feedback**: no spinner, no checkmark, no color changes, no animations
- **Form stays filled**: data remains in fields after submit, leaving user unsure if it worked

## Key Takeaways
- Feedback at every stage (loading, success, error) builds user confidence
- Disabling controls during async work prevents accidental duplicates
- Personalized, specific confirmation messages ("Thanks Andrew, saved!") beat vague ones ("Done.")
- Short, indicated delays feel faster than long, silent ones
