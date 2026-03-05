#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/launch-creatives/nano-banana-2"
mkdir -p "$OUT/images"

FAL_KEY="${FAL_KEY:-}"
if [ -z "$FAL_KEY" ]; then
  echo "Set FAL_KEY in the environment before running this script."
  exit 1
fi

cat > "$OUT/prompts.json" <<'JSON'
[
  {
    "slug": "01-build-the-machine",
    "title": "Build the machine",
    "aspect_ratio": "16:9",
    "resolution": "1K",
    "placement": ["landing hero", "x/linkedin header", "launch page section break"],
    "prompt": "Premium cyberpunk operator desk for Applied Leverage launch creative. Dark cinematic workspace, black metal desk, subtle green terminal glow, dark UI dashboards floating on screens, abstract agent nodes and workflow graph, premium brutalist typography area with the words 'Build the machine.' No humans visible. Sharp contrast, luxury startup aesthetic, tactical operating-system vibe, clean composition with negative space for copy, realistic lighting, polished ad photography mixed with cinematic 3D UI overlays. Brand feel: sharp, direct, operator-focused, no cartoon look, no cheesy neon clutter."
  },
  {
    "slug": "02-founder-chaos-vs-leverage",
    "title": "Founder chaos vs leverage",
    "aspect_ratio": "4:5",
    "resolution": "1K",
    "placement": ["meta ad", "linkedin sponsored post", "campaign pack cover"],
    "prompt": "Split-screen premium ad creative for Applied Leverage. Left side: overwhelmed founder drowning in browser tabs, Slack pings, sticky notes, admin tasks, cluttered desk, stress, muted red tones. Right side: same founder calm and in control with streamlined dashboard, automation flows, AI council cards, clean desk, confident posture, dark premium green and graphite tones. Editorial ad look, realistic human subject, sharp lighting, high contrast, composition designed for paid social. Visual message: from founder bottleneck to leverage machine. No extra text except optional subtle headline space."
  },
  {
    "slug": "03-four-layers-poster",
    "title": "Target Reps Machine Council",
    "aspect_ratio": "4:5",
    "resolution": "1K",
    "placement": ["instagram/linkedin feed", "pdf campaign pack", "sales deck divider"],
    "prompt": "Premium dark poster design for Applied Leverage showing four stacked leverage layers as iconic modules: Target, Reps, Machine, Council. Brutalist high-end typography, graphite black background, subtle green accents, thin system lines, elegant depth, polished product-launch poster aesthetic. The four words should feel carved into a tactical operating system. Minimal, sharp, expensive, modern, not cluttered, not sci-fi cheesy. Composition optimized for an ad creative with strong hierarchy and room for a short headline or CTA."
  },
  {
    "slug": "04-growth-creates-chaos",
    "title": "If growth creates chaos",
    "aspect_ratio": "4:5",
    "resolution": "1K",
    "placement": ["paid social ad", "email hero image", "retargeting creative"],
    "prompt": "High-contrast paid social ad visual for Applied Leverage. Show a sleek service-business machine under strain: revenue graph rising while cables, tabs, tasks, and admin clutter explode around it. Premium dark background, crisp white and green highlights, tension between growth and chaos. Editorial campaign quality, realistic textures, strong central focal point, room for headline 'If growth creates chaos, you need leverage.' No cheap stock-photo look. Designed to stop the scroll."
  },
  {
    "slug": "05-terminal-founder-relief",
    "title": "Founder bottleneck relief",
    "aspect_ratio": "16:9",
    "resolution": "1K",
    "placement": ["landing page section", "launch thread art", "website feature panel"],
    "prompt": "Tactical operating-system style visual for Applied Leverage. Dark terminal interface with elegant green glow, command-line panels, workflow automations, AI council member cards, throughput metrics, and a clear sense of founder relief and control. Premium cinematic tech aesthetic, sharp typography zones, black and deep graphite palette, subtle grain, clean layers, modern and persuasive. Feels like an elite operator dashboard rather than generic SaaS UI."
  }
]
JSON

jq -c '.[]' "$OUT/prompts.json" | while read -r item; do
  slug=$(jq -r '.slug' <<<"$item")
  prompt=$(jq -r '.prompt' <<<"$item")
  aspect_ratio=$(jq -r '.aspect_ratio' <<<"$item")
  resolution=$(jq -r '.resolution' <<<"$item")

  echo "Generating $slug..."
  response=$(curl -sS --fail --request POST \
    --url https://fal.run/fal-ai/nano-banana-2 \
    --header "Authorization: Key $FAL_KEY" \
    --header "Content-Type: application/json" \
    --data @- <<JSON
{
  "prompt": $(jq -Rn --arg v "$prompt" '$v'),
  "num_images": 1,
  "aspect_ratio": $(jq -Rn --arg v "$aspect_ratio" '$v'),
  "output_format": "png",
  "resolution": $(jq -Rn --arg v "$resolution" '$v'),
  "limit_generations": true,
  "safety_tolerance": "4"
}
JSON
)
  printf '%s\n' "$response" > "$OUT/${slug}.json"
  url=$(jq -r '.images[0].url' "$OUT/${slug}.json")
  curl -sS --fail "$url" -o "$OUT/images/${slug}.png"
done

cat > "$OUT/README.md" <<'MD'
# Nano Banana 2 launch creatives

Generated via `fal-ai/nano-banana-2` for Applied Leverage.

Contents:
- `images/` — exported PNG creatives
- `prompts.json` — source prompts, placements, and specs
- `*.json` — raw Fal API responses for each creative
- `usage-notes.md` — packaging notes for landing page + campaign pack

Model defaults used:
- endpoint: `fal-ai/nano-banana-2`
- output: PNG
- resolution: 1K
- safety tolerance: 4
- one image per prompt

Do not commit API keys. The key was read from 1Password at run time.
MD

cat > "$OUT/usage-notes.md" <<'MD'
# Usage notes

## Creative set
1. `01-build-the-machine.png`
   - Best for landing hero, section divider, launch announcement banner
   - Pair with copy: "Build the machine."
2. `02-founder-chaos-vs-leverage.png`
   - Best for paid social before/after framing
   - Pair with copy: "Your bottleneck isn't effort. It's founder dependency."
3. `03-four-layers-poster.png`
   - Best for campaign pack cover, PDF divider, carousel panel
   - Pair with copy: "Target. Reps. Machine. Council."
4. `04-growth-creates-chaos.png`
   - Best for retargeting ad or email hero
   - Pair with copy: "If growth creates chaos, you need leverage."
5. `05-terminal-founder-relief.png`
   - Best for landing page feature section or launch thread image
   - Pair with copy: "Install the operating system."

## Notes for launch packaging
- Feed ads: prefer the 4:5 images (`02`, `03`, `04`)
- Site/headers: prefer the 16:9 images (`01`, `05`)
- Keep headline overlays short and brutal
- Use white or pale green type over darker negative space
- Avoid stacking more than one CTA on-image

## Suggested next edits
- Upscale winning variants to 2K for final web export
- Create one square crop from `03` for carousel use
- A/B test `02` vs `04` as the first paid social asset
MD

echo "Done. Outputs in $OUT"
