PROJECT_NAME=meramoney
BUILD_VERSION=v1.0.0
DOCKER_HUB_USER=ngxvu

DOCKER_IMAGE=$(PROJECT_NAME):$(BUILD_VERSION)
GO_BUILD_ENV=CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GO111MODULE=on

compose_dev: docker
	docker tag $(PROJECT_NAME):$(BUILD_VERSION) $(DOCKER_HUB_USER)/$(PROJECT_NAME):$(BUILD_VERSION); \
	docker push $(DOCKER_HUB_USER)/$(PROJECT_NAME):$(BUILD_VERSION);

build:
	cd ./cmd/api; \
    $(GO_BUILD_ENV) go build -v -o $(PROJECT_NAME)-$(BUILD_VERSION).bin main.go

docker_prebuild: build
	mv ./cmd/api/$(PROJECT_NAME)-$(BUILD_VERSION).bin ./$(PROJECT_NAME).bin; \

docker_build:
	docker build --rm -t $(DOCKER_IMAGE) .;

docker_postbuild:
	rm -rf ./$(PROJECT_NAME).bin 2> /dev/null;\

docker: docker_prebuild docker_build docker_postbuild