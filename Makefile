.PHONY: build up bench-sim analyze test clean stop logs

# Build the Docker image
build:
	docker compose build

# Start the API server
up:
	docker compose up llm-server -d
	@echo "Server starting at http://localhost:8000"
	@echo "Run 'make logs' to see server output"

# Run benchmarks and analysis (full pipeline)
bench-sim:
	@mkdir -p results plots
	docker compose --profile bench up --build
	@echo "Benchmarks complete. Results in ./results/, plots in ./plots/"

# Run analysis only (requires results to exist)
analyze:
	@mkdir -p plots
	docker compose run --rm analysis
	@echo "Analysis complete. Plots in ./plots/"

# Run unit tests
test:
	docker compose --profile test up --build test
	@echo "Tests complete."

# Stop all services
stop:
	docker compose down

# View server logs
logs:
	docker compose logs -f llm-server

# Clean up results, plots, and containers
clean:
	docker compose down -v --remove-orphans
	rm -rf results/* plots/*
	@echo "Cleaned up."
