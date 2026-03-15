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
                withCredentials([
                    string(credentialsId: 'DB_URL', variable: 'DB_URL'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET')
                ]) {
                    sh '''  
                        docker stop laverna || true
                        docker rm laverna   || true
                        docker build -t laverna .
                        docker run -d \
                            --name laverna \
                            --add-host=host.docker.internal:host-gateway \
                            -v /opt/laverna/openssl:/laverna/openssl \
                            -p 443:443 \
                            -e DB_URL="$DB_URL" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            laverna
                    '''
                }
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