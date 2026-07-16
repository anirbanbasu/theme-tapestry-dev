# Install pre-commit hooks using 'prek'
install-pre-commit-hooks:
    @echo "Installing pre-commit hooks using prek..."
    @prek install
    @echo "Pre-commit hooks installed."

# Update pre-commit hooks using 'prek'
pre-commit-update:
    @echo "Updating pre-commit hooks using prek..."
    @prek auto-update
    @echo "Pre-commit hooks updated."

# Serve the website locally using Zola
serve:
    @echo "Serving the website locally using Zola..."
    @zola serve
    @echo "Website is being served at http://127.0.0.1:1111"

# Generate/update visual regression screenshot baselines locally (no PR automation)
update-visual-baselines-local:
    @echo "WARNING: This should not really be run locally except for testing the script because font rendering may differ across machines. Use the GitHub Actions workflow instead."
    @echo "Building site for visual regression tests..."
    @zola build --base-url http://127.0.0.1:1111
    @echo "Installing visual test dependencies..."
    @cd tests/visual-a11y && npm ci
    @echo "Installing Playwright Chromium browser..."
    @cd tests/visual-a11y && npx playwright install chromium
    @echo "Checking Playwright OS-level dependencies (only prompts for sudo if something is actually missing)..."
    @cd tests/visual-a11y && (npx playwright install-deps --dry-run chromium || npx playwright install-deps chromium)
    @echo "Updating visual regression screenshot baselines..."
    @cd tests/visual-a11y && npx playwright test tests/visual.spec.ts --update-snapshots=all
    @echo "Done. Updated screenshots are in tests/visual-a11y/screenshots/."
    @echo "WARNING: Do not commit the updated screenshots since this is for local testing only."

# Run the visual/a11y CI test flow locally across the given style groups (defaults to all five)
visual-a11y-tests-local *groups='scholarly creative natural precision collective':
    @echo "Running zola check..."
    @zola check
    @echo "Building site for CI-parity visual/a11y tests..."
    @zola build --base-url http://127.0.0.1:1111
    @echo "Installing visual test dependencies..."
    @cd tests/visual-a11y && npm ci
    @echo "Installing Playwright Chromium browser..."
    @cd tests/visual-a11y && npx playwright install chromium
    @echo "Checking Playwright OS-level dependencies (only prompts for sudo if something is actually missing)..."
    @cd tests/visual-a11y && (npx playwright install-deps --dry-run chromium || npx playwright install-deps chromium)
    @echo "Running accessibility, visual, and keyboard suites for style groups: {{ groups }}..."
    @bash -c 'set -uo pipefail; \
        failed=0; \
        for group in {{ groups }}; do \
            echo "== STYLE_GROUP=$group: a11y =="; \
            cd tests/visual-a11y; STYLE_GROUP="$group" npx playwright test tests/a11y.spec.ts --output="test-results/$group-a11y" || failed=1; cd ../..; \
            echo "== STYLE_GROUP=$group: visual =="; \
            cd tests/visual-a11y; STYLE_GROUP="$group" npx playwright test tests/visual.spec.ts --output="test-results/$group-visual" || failed=1; cd ../..; \
            echo "== STYLE_GROUP=$group: keyboard =="; \
            cd tests/visual-a11y; STYLE_GROUP="$group" npx playwright test tests/keyboard.spec.ts --output="test-results/$group-keyboard" || failed=1; cd ../..; \
        done; \
        exit $failed'
    @echo "Done. Local visual/a11y test workflow completed."
