pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    sudo docker stop laverna || true
                    sudo docker rm laverna || true
                    sudo docker build -t laverna .
                    sudo docker run -d \
                        --add-host=host.docker.internal:host-gateway \
                        -v /home/giorguna_jr/openssl:/laverna/openssl \
                        -p 443:443 \
                        -e DB_URL="$DB_URL" \
                        -e JWT_SECRET="$JWT_SECRET" \
                        laverna
                '''
            }
        }
    }

    post {
        success {
            echo 'Deploy succeeded'
        }
        failure {
            echo 'Deploy failed'
        }
    }
}