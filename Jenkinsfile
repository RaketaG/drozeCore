pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage("Buildgit") {
            steps {
                echo 'Bob is on the way'
            }
        }
    }
}
