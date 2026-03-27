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
                        docker stop drozeCore || true
                        docker rm drozeCore   || true
                        docker build -t drozeCore .
                        docker run -d \
                            --name drozeCore \
                            --add-host=host.docker.internal:host-gateway \
                            -v /opt/laverna/openssl:/drozeCore/openssl \
                            -p 443:443 \
                            -e DB_URL="$DB_URL" \
                            -e JWT_SECRET="$JWT_SECRET" \
                            drozeCore
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