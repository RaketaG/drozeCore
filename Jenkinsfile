pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage("Build") {
            steps {
                echo 'Bob is on the way'
            }
        }
    }
}
