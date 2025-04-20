docker-build:
	bash -c 'export $$(cat .env | xargs) && cat Dockerfile | envsubst | docker build --progress=plain -t v2x . -f -'

docker-run:
	docker run -p 5000:5000 -p 5555:5555 -p 8080:8080 -it v2x