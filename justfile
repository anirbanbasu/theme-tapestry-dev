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
