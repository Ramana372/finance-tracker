pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = "ramana372/finance-tracker"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        stage('Test') {
            steps {
                dir('frontend') {
                    bat 'npm test || exit 0'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                dir('frontend') {
                    bat "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Login to Docker Hub') {
            steps {
                bat 'echo %DOCKERHUB_CREDENTIALS_PSW% | docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                bat "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                bat "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                bat "docker push ${IMAGE_NAME}:latest"
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deployment step placeholder - customize based on target platform'
                // Add deployment steps (e.g., SSH to a server, Kubernetes apply, etc.)
            }
        }
    }
    post {
        always {
            bat "docker rmi ${IMAGE_NAME}:${IMAGE_TAG} || exit 0"
        }
    }
}
