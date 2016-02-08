# gfyrandomcat
Password generation using random.org with the gfycat adjectives and animal lists.

## Why?
Why not have an interesting memorable password inspired by [xkcd](https://xkcd.com/936/)?

Basically the password will follow a pattern of Adjective|###|Animal|###|Adjective.

This means (with my hastily put together maths) that there will nearly **400 quadrillion** possible passwords (1501 \* 999 \* 1750 \* 999 \* 1501 \* 999 = 3.9309353e+18).

## How?
 * The script requests 3 random numbers at a max length of the Gyfcat Adjective list
 * The script requests 3 random numbers at a max length of the Gyfcat Animal list
 * The script requests 3 random numbers at a max value of 999
 * The script then combines these into the pattern (this will likely change)

## Where to use?
The script is intended as an AWS Lambda function (and to have a AWS API Gateway in front of it). However you can run it locally on your command line (assuming you've node installed and you do a ``npm install``).

Once Cloudformation supports API Gateway, I'll package it up as a single deployable thing.

**Also of note**
Node.js added native promise support in version 0.11.13, lambda is currently running [0.10.36](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html) - once aws is up to date, bluebird will get dropped.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## License
gfyrandomcat is released under the MIT License. See the `LICENSE` file.
