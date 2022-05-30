FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY ./django/ /code/
COPY run.sh /bin/

ENTRYPOINT ["/bin/run.sh"]
