FROM python:3.14-alpine

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./main.py /code/

CMD ["fastapi", "run", "app/main.py", "--port", "8084", "--proxy-headers"]
