DATE := $(shell date '+%Y/%m/%d')
TIME := $(shell date '+%H-%M-%S')
OUTPUT_DIR = outputs/$(DATE)

rmzi:
	bash ./tools/rmzi.sh

start:
	mkdir -p $(OUTPUT_DIR) && \
	uv run ./main.py | tee $(OUTPUT_DIR)/$(TIME).txt