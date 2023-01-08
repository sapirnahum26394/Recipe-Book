FROM python:3.8

ENV PYTHONUNBUFFERED 1
ENV MONGO_HOST mongodb
RUN mkdir /app
WORKDIR /app
RUN pip3 install --upgrade pip==22.1.0
COPY requirements.txt /app/
RUN pip3 install -r requirements.txt

COPY . /app/

EXPOSE 5000

CMD gunicorn -w 1 -b [::]:5000 main:app
# ENTRYPOINT ["/bin/bash"]
#CMD ["python", "main.py"]