import click
from commands.run_script import run_script
from commands.list_files import list_files

@click.group()
def cli():
    """
    Command-Line Interface for Intellico.
    """
    pass

# Add the run_script command to the CLI
cli.add_command(run_script)
cli.add_command(list_files)

if __name__ == "__main__":
    cli()
