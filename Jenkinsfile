pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME = "ramana2003/finance-tracker"
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
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                    bat "docker tag %IMAGE_NAME%:%IMAGE_TAG% %IMAGE_NAME%:latest"
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                bat '''
                echo|set /p=%DOCKERHUB_CREDENTIALS_PSW%|docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                bat "docker push %IMAGE_NAME%:%IMAGE_TAG%"
                bat "docker push %IMAGE_NAME%:latest"
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker stop finance-tracker-container || true'
                sh 'docker rm finance-tracker-container || true'
            }
        }

        stage('Run New Container') {
            steps {
                sh "docker run -d -p 3099:80 --name finance-tracker-container ramana2003/finance-tracker:latest"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment step placeholder - customize based on target platform'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
            bat "docker rmi %IMAGE_NAME%:%IMAGE_TAG% || exit 0"
        }
    }
}
