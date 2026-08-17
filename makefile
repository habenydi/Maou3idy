.PHONY: all clean fclean re

all: docker-up
	$(MAKE) -C auth
	$(MAKE) -C notification

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

clean:
	$(MAKE) -C auth clean
	$(MAKE) -C notification clean

fclean: docker-down
	$(MAKE) -C auth fclean
	$(MAKE) -C notification fclean

re: fclean all
